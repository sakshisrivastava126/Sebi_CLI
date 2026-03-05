export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-4">✅ Device Authorized!</h1>
        <p className="text-muted-foreground">You can close this window and return to your terminal.</p>
      </div>
    </div>
  );
}