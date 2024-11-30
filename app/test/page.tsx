"use client"

import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import FearGreedIndexMeter from '@/components/fear-greed-index-meter'

export default function Home() {
  const [indexValue, setIndexValue] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setIndexValue(value)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Fear & Greed Index</CardTitle>
          <CardDescription>Current market sentiment indicator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className='w-40'>
                <FearGreedIndexMeter value={indexValue} />
            </div>
          <div className="space-y-2">
            <label htmlFor="index-slider" className="text-sm font-medium">
              Adjust Index Value:
            </label>
            <Slider
              id="index-slider"
              min={0}
              max={100}
              step={1}
              value={[indexValue]}
              onValueChange={(value: any) => setIndexValue(value[0])}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min={0}
              max={100}
              value={indexValue}
              onChange={handleInputChange}
              className="w-20"
            />
            <Button variant="outline" onClick={() => setIndexValue(0)}>0</Button>
            <Button variant="outline" onClick={() => setIndexValue(25)}>25</Button>
            <Button variant="outline" onClick={() => setIndexValue(50)}>50</Button>
            <Button variant="outline" onClick={() => setIndexValue(75)}>75</Button>
            <Button variant="outline" onClick={() => setIndexValue(100)}>100</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

