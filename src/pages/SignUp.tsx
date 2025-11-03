import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Navbar />
      
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <CardDescription className="text-base">
                Sign up to start booking your perfect experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/90">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  className="focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/90">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/90">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password"
                  className="focus-visible:border-accent"
                />
              </div>
              <Button className="w-full mt-6" size="lg" style={{ background: 'var(--gradient-accent)' }}>
                Sign Up
              </Button>
              <div className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
