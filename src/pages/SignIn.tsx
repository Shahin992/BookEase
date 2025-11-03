import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navbar />
      
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/90">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/90">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="focus-visible:border-primary"
                />
              </div>
              <Button className="w-full mt-6" size="lg" style={{ background: 'var(--gradient-hero)' }}>
                Sign In
              </Button>
              <div className="text-center text-sm text-muted-foreground pt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
