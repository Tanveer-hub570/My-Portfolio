
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

interface OTPFormProps {
  phone: string;
  onVerificationSuccess: () => void;
  onCancel: () => void;
}

export function OTPForm({ phone, onVerificationSuccess, onCancel }: OTPFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsVerifying(true);
    
    // In a real application, this would call a backend API
    // For now, we'll simulate a verification delay and success
    setTimeout(() => {
      // Hard-coded OTP "1234" for demo purposes
      if (values.otp === "1234") {
        toast({
          title: "Phone Verified",
          description: "Your phone number has been verified successfully.",
        });
        onVerificationSuccess();
      } else {
        toast({
          title: "Invalid Code",
          description: "The verification code you entered is invalid.",
          variant: "destructive",
        });
        form.setError("otp", { message: "Invalid verification code" });
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResend = () => {
    toast({
      title: "Code Resent",
      description: `A new verification code has been sent to ${phone}.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col items-center space-y-4">
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the 4-digit code sent to your phone.
                    <br />
                    <span className="text-xs text-muted-foreground">(Use "1234" for demo)</span>
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Button type="submit" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>
          <div className="flex justify-between mt-2">
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Go Back
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleResend}>
              Resend Code
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
