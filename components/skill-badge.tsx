import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <Card className="h-full border-[#2a1b5a]/90 bg-[#151030]/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#915eff]/60 hover:shadow-[0_16px_45px_rgba(145,94,255,0.16)]">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#d8d4ff]">{name}</span>
            <span className="text-sm text-[#915eff]">{level}%</span>
          </div>
          <Progress value={level} className="h-2 bg-[#2a1b5a]">
            <div className="h-full bg-gradient-to-r from-[#915eff] to-[#5d8eff] rounded-full" />
          </Progress>
        </div>
      </CardContent>
    </Card>
  )
}
