import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <Card className="bg-[#151030] border-[#2a1b5a] hover:shadow-[0_0_10px_rgba(145,94,255,0.2)] transition-all duration-300">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#aaa6c3]">{name}</span>
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

