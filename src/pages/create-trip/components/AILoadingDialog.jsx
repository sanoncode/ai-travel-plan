/* eslint-disable react/prop-types */
"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle} from "lucide-react"
import { Link } from "react-router-dom"


const generationSteps = [
  "Analyzing request and planning response",
  "Gathering relevant information",
  "Structuring content outline",
  "Generating detailed content",
  "Refining and polishing output",
  "Finalizing and preparing delivery",
]

export function AILoadingDialog({
  open,
  status = "loading", // "loading" | "success" | "error"
  errorMessage,
  setOpen,
  viewTripId,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  console.log(status, 'status')

  useEffect(() => {
    if (!isLoading) return;

    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < generationSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 1000);

    return () => clearInterval(stepInterval);
  }, [isLoading]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <div className="flex flex-col items-center space-y-6 py-4">

          {/* ICON / IMAGE */}
          <div className="flex items-center justify-center w-full rounded-full">
            {isLoading && (
              <img src="/placeholder.jpg" className="h-[300px] w-full p-2" />
            )}

            {isSuccess && (
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            )}

            {isError && (
              <XCircle className="h-10 w-10 text-red-500" />
            )}
          </div>

          {/* TITLE */}
          <div className="text-center space-y-2">
            <DialogTitle className="text-lg font-medium">
              {isLoading && "Creating a travel plan for you"}
              {isSuccess && "Completed!"}
              {isError && "Something went wrong"}
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              {isLoading && "Please wait while our AI creates your travel plan"}
              {isSuccess && "Your travel plan is ready to view"}
              {isError && (errorMessage || "Server is busy, please try again later")}
            </DialogDescription>
          </div>

          {/* 🔥 PROGRESS (ONLY LOADING) */}
          {isLoading && (
            <div className="w-full space-y-4">
              <div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden animate-pulse">
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
                    className={`flex items-center gap-3 p-2 rounded-md ${
                      index === currentStep ? "bg-primary/5 animate-pulse" : ""
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : index === currentStep ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border" />
                    )}

                    <span className={`text-sm ${index <= currentStep ? "" : "text-muted-foreground"}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTON */}
          {/* {isLoading && (
            <Button variant="outline" onClick={onCancel}>
              Cancel Generation
            </Button>
          )} */}

          {isSuccess && (
            <Link to={"/view-trip/" + viewTripId}>
              <Button>View the plan!</Button>
            </Link>
          )}

          {isError && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
