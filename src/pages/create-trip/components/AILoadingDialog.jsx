/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateTripStore } from "@/store/useCreateTripStore";
import { useShallow } from "zustand/shallow";
import { ERROR_UI_MAP } from "@/lib/errors/errorMap";
import { getTimeUntilReset } from "@/lib/utils";

// ================
// STEPS
// ==========
const generationSteps = [
  "Analyzing request and planning response",
  "Gathering relevant information",
  "Structuring content outline",
  "Generating detailed content",
  "Refining and polishing output",
  "Finalizing and preparing delivery",
];

export function AILoadingDialog({ onRetry }) {
  const [currentStep, setCurrentStep] = useState(0);

  const navigate = useNavigate();

  const { generation, reset, openGenerateDialog, result } = useCreateTripStore(
    useShallow((state) => ({
      generation: state.generation,
      openGenerateDialog: state.openGenerateDialog,
      reset: state.reset,
      result: state.result,
    })),
  );

  const errorType = generation.error;

  const isLoading = generation.status === "loading";
  const isSuccess = generation.status === "success";
  const isError = generation.status === "error";
  const isOffline = generation.status === "offline";
  const isLimit = generation.status === "limit";

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
    <Dialog open={openGenerateDialog}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* ICON / IMAGE */}
          <div className="flex items-center justify-center w-full rounded-full">
            {isLoading && (
              <img src="/placeholder.jpg" className="h-[300px] w-full p-2" />
            )}

            {isSuccess && <CheckCircle2 className="h-10 w-10 text-green-500" />}
            {isLimit && <Clock className="h-10 w-10 text-orange-500" />}
            {isError && <XCircle className="h-10 w-10 text-red-500" />}
            {isOffline && <XCircle className="h-10 w-10 text-red-500" />}
          </div>

          {/* TITLE */}
          <div className="text-center space-y-2">
            <DialogTitle className="text-lg font-medium">
              {isLoading && "Creating a travel plan for you"}
              {isSuccess && "Completed!"}
              {isLimit && "Daily Limit Reached"}
              {isError && "Something went wrong"}
              {isOffline && "No Internet Connection"}
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              {isLoading && "Please wait while our AI creates your travel plan"}
              {isSuccess && "Your travel plan is ready to view"}
              {isLimit && "Unfortunately You've reached daily limit (3x)"}
              {isError &&
                (ERROR_UI_MAP[errorType]?.message || "something went wrong")}
              {isOffline &&
                "Your Connection seems unstable, please check your internet and try again"}
            </DialogDescription>
          </div>

          {isLimit && (
            <>
              <div className="bg-muted rounded-lg p-4 flex items-start gap-3 mt-4">
                <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Your Daily Limit: 3 Times</p>
                  <p className="text-muted-foreground">
                    You&apos;ll be able to use it again ~ {getTimeUntilReset()}
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-start gap-3 mt-3">
                <Lightbulb className="w-5 h-5 text-purple-500 mt-0.5" />
                <p className="text-sm text-purple-700">
                  Tip: plan ahead and make the most of your daily tries ! ✨
                </p>
              </div>
            </>
          )}

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

                    <span
                      className={`text-sm ${index <= currentStep ? "" : "text-muted-foreground"}`}
                    >
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
            <Button
              className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition"
              onClick={() => {
                reset();
                useCreateTripStore.persist.clearStorage()
                navigate(`/view-trip/${result.tripId}`);
              }}
            >
              View the plan!
            </Button>
          )}

          {isError && (
            <div className="flex gap-2">
              <Button
                className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition"
                onClick={() => {
                  reset();
                  onRetry();
                }}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                }}
              >
                Close
              </Button>
            </div>
          )}
          {isLimit && (
            <div className="flex gap-2">
              <Button
                className="px-6 py-2 bg-[#E07A5F] text-white rounded-full font-semibold hover:bg-[#d0694e] transition"
                onClick={() => {
                  reset();
                  useCreateTripStore.persist.clearStorage()
                  navigate("/");
                }}
              >
                
                Try Again Tomorrow
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                }}
              >
                Close
              </Button>
            </div>
          )}

          {isOffline && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onRetry();
                }}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
