import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signinUser } from "@/api/authApi";
import { signinSchema } from "@/Utils/userValidation";
import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
   const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Clear field-level error on change
    console.log(errors)
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }

    if(errors.general){
      setErrors((prev)=>({...prev, general:''}))
    }

    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const validation = signinSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const from = (location.state as { from?: string })?.from || "/";

    setLoading(true);
    try {
      const response = await signinUser(form);
      const { _id, fullName, email, token, userId } = response.data;
      login({ _id, fullName, email, userId }, token);
      
      if(from){
        navigate(from, { replace: true });
      } else {
         navigate("/services"); 
      }
     
    } catch (error: any) {
      console.error("Signin error:", error);
      setErrors({ general: error.response?.data?.message || "Failed to sign in" });
    } finally {
      setLoading(false);
    }
  };

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
                  onChange={handleChange}
                />
                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/90">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="focus-visible:border-primary"
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
              </div>
              <Button 
                  onClick={handleSubmit}
                  disabled={loading}  
                  className="w-full mt-6" 
                  size="lg" 
                  style={{ background: 'var(--gradient-hero)' }}
                >
                {loading ? "Signing in..." : "Sign In"}
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
