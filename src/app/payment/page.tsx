
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const serviceName = searchParams.get('serviceName');
  const influencerName = searchParams.get('influencerName');
  const price = searchParams.get('price');
  const paymentMethod = searchParams.get('paymentMethod');

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate API call to payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: 'Payment Successful!',
        description: `Your request for "${serviceName}" from ${influencerName} has been sent.`,
      });
      router.push('/dashboard');
    }, 2000);
  };

  if (!serviceName || !influencerName || !price || !paymentMethod) {
    useEffect(() => {
      router.push('/influencers');
    }, [router]);
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <ShieldCheck className="h-8 w-8" />
            </div>
          <CardTitle className="text-3xl font-headline mt-4">Confirm Your Payment</CardTitle>
          <CardDescription>Review your order details and confirm to proceed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                    <p className="text-muted-foreground">Service:</p>
                    <p className="font-semibold">{serviceName}</p>
                </div>
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Creator:</p>
                    <p className="font-semibold">{influencerName}</p>
                </div>
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Payment Method:</p>
                    <p className="font-semibold capitalize">{paymentMethod}</p>
                </div>
            </div>
             <div className="border rounded-lg p-4 text-center">
                <p className="text-muted-foreground">Total Amount</p>
                <p className="text-4xl font-bold">₹{price}</p>
            </div>
        </CardContent>
        <CardFooter>
          <Button 
            size="lg" 
            className="w-full"
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                'Confirm & Pay'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageContent />
        </Suspense>
    )
}
