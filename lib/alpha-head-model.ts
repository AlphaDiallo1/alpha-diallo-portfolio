import * as THREE from "three"

// A sculpted reconstruction of the supplied front-view avatar. Hidden surfaces
// are inferred; every feature is geometry, so the model can rotate in 3D.
export function createAlphaHead() {
  const head = new THREE.Group()
  head.name = "Alpha avatar — reconstructed from reference"
  const material = (color: string, roughness = 0.55, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness })
  const skin = material("#57412e", 0.68)
  const earSkin = material("#493421", 0.72)
  const hair = material("#171a1e", 0.46)
  const brow = material("#242120", 0.8)
  const mouth = material("#4b3027", 0.8)
  const lip = material("#594032", 0.7)
  const white = material("#fff9ed", 0.24)
  const iris = material("#876039", 0.32)
  const irisRim = material("#372419", 0.48)
  const pupil = material("#070808", 0.12)
  const silver = material("#e6eaf2", 0.16, 0.9)

  function mesh(geometry: THREE.BufferGeometry, mat: THREE.Material, name: string) {
    const object = new THREE.Mesh(geometry, mat)
    object.name = name
    object.castShadow = true
    object.receiveShadow = true
    head.add(object)
    return object
  }
  function ellipsoid(name: string, mat: THREE.Material, position: [number, number, number], scale: [number, number, number], segments = 48) {
    const object = mesh(new THREE.SphereGeometry(1, segments, 32), mat, name)
    object.position.set(...position)
    object.scale.set(...scale)
    return object
  }
  function curve(name: string, points: [number, number, number][], radius: number, mat: THREE.Material) {
    return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), 48, radius, 10, false), mat, name)
  }
  function faceZ(x: number, y: number) {
    return 0.79 * Math.sqrt(Math.max(0.03, 1 - (x / 0.98) ** 2 - ((y - 0.02) / 1.23) ** 2))
  }

  const skull = new THREE.SphereGeometry(1, 96, 72)
  const positions = skull.attributes.position
  for (let i = 0; i < positions.count; i++) {
    const px = positions.getX(i), py = positions.getY(i), pz = positions.getZ(i)
    const jaw = 1 - 0.14 * Math.max(0, -py)
    const x = px * 0.98 * jaw
    const y = py * 1.23 + 0.02
    const cheeks = pz > 0 ? 0.025 * Math.exp(-((Math.abs(x) - 0.5) ** 2 / 0.12 + (y + 0.28) ** 2 / 0.12)) : 0
    const nose = pz > 0 ? (0.065 * Math.exp(-(x * x / 0.011 + (y + 0.19) ** 2 / 0.065)) + 0.17 * Math.exp(-(x * x / 0.018 + (y + 0.345) ** 2 / 0.012))) * pz ** 4 : 0
    positions.setXYZ(i, x, y, pz * 0.79 + cheeks + nose)
  }
  skull.computeVertexNormals()
  mesh(skull, skin, "Smooth cheeks, jaw and chin")

  // Hair follows the skull: a clean forehead line, tapered temples, and
  // raised concentric waves continuing around the sides and back.
  const hairPositions: number[] = [], hairColors: number[] = [], indices: number[] = []
  const columns = 160, rows = 72
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= columns; col++) {
      const phi = col / columns * Math.PI * 2
      const sideAngle = Math.acos(Math.cos(phi))
      const temple = THREE.MathUtils.smoothstep(sideAngle, 0.9, Math.PI / 2)
      const back = THREE.MathUtils.smoothstep(sideAngle, Math.PI / 2, Math.PI)
      const boundary = 0.98 + 0.71 * temple + 0.24 * back
      const theta = row / rows * boundary
      const wave = Math.sin(theta * 47 + 0.6 * Math.sin(phi * 2))
      const ridge = 0.009 * wave
      const r = 1 + ridge
      hairPositions.push(Math.sin(theta) * Math.sin(phi) * 1.002 * r, Math.cos(theta) * 1.26 * r + 0.035, Math.sin(theta) * Math.cos(phi) * 0.815 * r)
      const color = new THREE.Color("#24282d").multiplyScalar(0.88 + wave * 0.1)
      hairColors.push(color.r, color.g, color.b)
      if (row < rows && col < columns) {
        const a = row * (columns + 1) + col, b = a + columns + 1
        indices.push(a, b, a + 1, b, b + 1, a + 1)
      }
    }
  }
  const hairGeometry = new THREE.BufferGeometry()
  hairGeometry.setAttribute("position", new THREE.Float32BufferAttribute(hairPositions, 3))
  hairGeometry.setAttribute("color", new THREE.Float32BufferAttribute(hairColors, 3))
  hairGeometry.setIndex(indices)
  hairGeometry.computeVertexNormals()
  mesh(hairGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.47, metalness: 0.07, side: THREE.DoubleSide }), "Sculpted wave haircut")

  for (const side of [-1, 1]) {
    const ear = ellipsoid(`${side < 0 ? "Right" : "Left"} ear`, skin, [side * 0.955, -0.105, 0.02], [0.15, 0.285, 0.165])
    ear.rotation.z = -side * 0.16
    ellipsoid("Ear concha", earSkin, [side * 1.009, -0.115, 0.128], [0.072, 0.177, 0.047])
    ellipsoid("Ear tragus", skin, [side * 0.961, -0.13, 0.16], [0.055, 0.11, 0.056])
    ellipsoid("Silver earring setting", silver, [side * 1.0, -0.305, 0.15], [0.046, 0.05, 0.03], 24)
    const gem = mesh(new THREE.OctahedronGeometry(0.042, 0), material("#f6fcff", 0.09, 0.25), "Diamond stud")
    gem.position.set(side * 1.0, -0.3, 0.179)
    gem.rotation.z = Math.PI / 4

    const cx = side * 0.408, cy = 0.028
    // Almond-shaped curved eye whites rather than exposed spherical eyeballs.
    const vertices: number[] = [], triangles: number[] = []
    const eyeColumns = 40, eyeRows = 16
    for (let u = 0; u <= eyeColumns; u++) {
      const t = u / eyeColumns, x = cx + (t - 0.5) * 0.505
      const upper = 0.155 * Math.sin(Math.PI * t), lower = -0.112 * Math.sin(Math.PI * t)
      for (let v = 0; v <= eyeRows; v++) {
        const s = v / eyeRows, y = cy + lower + (upper - lower) * s
        const z = faceZ(x, y) + 0.025 + 0.029 * Math.sin(Math.PI * t) * Math.sin(Math.PI * s)
        vertices.push(x, y, z)
        if (u < eyeColumns && v < eyeRows) { const a = u * (eyeRows + 1) + v, b = a + eyeRows + 1; triangles.push(a, b, a + 1, b, b + 1, a + 1) }
      }
    }
    const eyeGeometry = new THREE.BufferGeometry()
    eyeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    eyeGeometry.setIndex(triangles)
    eyeGeometry.computeVertexNormals()
    const whiteMat = white.clone(); whiteMat.side = THREE.DoubleSide
    mesh(eyeGeometry, whiteMat, "Almond eye white")
    // Follow the cheek's tangent so the iris stays seated at side angles.
    function eyeLens(name: string, mat: THREE.Material, dx: number, dy: number, depth: number, scale: [number, number, number]) {
      const angle = side * 0.37
      const lens = ellipsoid(name, mat, [cx + Math.cos(angle) * dx + Math.sin(angle) * depth, cy + dy, faceZ(cx, cy) - Math.sin(angle) * dx + Math.cos(angle) * depth], scale)
      lens.rotation.y = angle
    }
    eyeLens("Dark iris outline", irisRim, 0, 0.014, 0.058, [0.126, 0.133, 0.012])
    eyeLens("Brown iris", iris, 0, 0.013, 0.067, [0.111, 0.12, 0.01])
    eyeLens("Pupil", pupil, 0, 0.028, 0.079, [0.075, 0.092, 0.012])
    eyeLens("Eye catchlight", white, -0.041, 0.089, 0.097, [0.029, 0.029, 0.007])
    const lid: [number, number, number][] = []
    const lowerLid: [number, number, number][] = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20, x = cx + (t - 0.5) * 0.512
      const y = cy + 0.16 * Math.sin(Math.PI * t)
      lid.push([x, y, faceZ(x, y) + 0.04])
      const ly = cy - 0.119 * Math.sin(Math.PI * t)
      lowerLid.push([x, ly, faceZ(x, ly) + 0.032])
    }
    curve("Upper lash line", lid, 0.018, brow)
    curve("Lower eyelid", lowerLid, 0.016, skin)
    const eyebrow: [number, number, number][] = []
    for (let i = 0; i <= 12; i++) {
      const t = i / 12, x = cx + (t - 0.5) * 0.45
      const y = 0.345 + 0.05 * Math.sin(Math.PI * t) - side * (t - 0.5) * 0.026
      eyebrow.push([x, y, faceZ(x, y) + 0.034])
    }
    curve("Soft arched eyebrow", eyebrow, 0.026, brow)
  }

  // The bridge and rounded nose are integrated into the skull geometry.
  // Low-profile lips and the short, parted moustache from the reference.
  const lower = ellipsoid("Lower lip", lip, [0, -0.658, faceZ(0, -0.658) + 0.003], [0.24, 0.062, 0.047])
  lower.rotation.x = -0.1
  curve("Upper lip cupid bow", [[-0.245, -0.615, faceZ(-0.245, -0.615) + 0.02], [-0.12, -0.605, faceZ(-0.12, -0.605) + 0.041], [-0.052, -0.591, faceZ(-0.052, -0.591) + 0.038], [0, -0.615, faceZ(0, -0.615) + 0.046], [0.052, -0.591, faceZ(0.052, -0.591) + 0.038], [0.12, -0.605, faceZ(0.12, -0.605) + 0.041], [0.245, -0.615, faceZ(0.245, -0.615) + 0.02]], 0.019, lip)
  curve("Mouth seam", [[-0.23, -0.632, faceZ(-0.23, -0.632) + 0.03], [0, -0.638, faceZ(0, -0.638) + 0.051], [0.23, -0.632, faceZ(0.23, -0.632) + 0.03]], 0.007, mouth)
  for (const side of [-1, 1]) {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 10; i++) { const x = side * (0.029 + i / 10 * 0.273), y = -0.521 - 0.039 * (i / 10) ** 1.6; points.push([x, y, faceZ(x, y) + 0.036]) }
    curve("Parted moustache", points, 0.017, hair)
  }
  return head
}
