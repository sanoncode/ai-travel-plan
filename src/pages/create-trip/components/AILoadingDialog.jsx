/* eslint-disable react/prop-types */
"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, BrainCircuit } from "lucide-react"

const generationSteps = [
  "Analyzing request and planning response",
  "Gathering relevant information",
  "Structuring content outline",
  "Generating detailed content",
  "Refining and polishing output",
  "Finalizing and preparing delivery",
]

export function AILoadingDialog({ open, onOpenChange, generating, onCancel }) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!generating) {
      return
    }

    // Reset when generation starts
    setCurrentStep(0)

    // Simulate step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < generationSteps.length - 1) {
          return prev + 1
        }
        clearInterval(stepInterval)
        return prev
      })
    }, 2000)

    return () => {
      clearInterval(stepInterval)
    }
  }, [generating])

  // Close dialog after completion with a small delay
  useEffect(() => {
    if (!generating && currentStep === generationSteps.length - 1) {
      const timeout = setTimeout(() => {
        onOpenChange(false)
      }, 1500)

      return () => clearTimeout(timeout)
    }
  }, [generating, currentStep, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            {generating ? (
              <BrainCircuit className="h-8 w-8 text-primary animate-pulse" />
            ) : (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            )}
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">{generating ? "Generating Content" : "Generation Complete"}</h3>
            <p className="text-sm text-muted-foreground">
              {generating ? "Please wait while our AI creates your content" : "Your content is ready to view"}
            </p>
          </div>

          <div className="w-full space-y-4">
            <div
              className={`w-full h-1 bg-primary/20 rounded-full overflow-hidden ${generating ? "animate-pulse" : ""}`}
            >
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${((currentStep + 1) / generationSteps.length) * 100}%`,
                }}
              />
            </div>

            <div className="space-y-3">
              {generationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                    index === currentStep && generating ? "bg-primary/5 animate-pulse" : ""
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : index === currentStep && generating ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-muted flex-shrink-0" />
                  )}
                  <span className={`text-sm ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {generating ? (
            <Button variant="outline" onClick={onCancel}>
              Cancel Generation
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>View Content</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

