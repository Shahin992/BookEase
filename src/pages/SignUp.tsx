import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "@/api/apiClient";
import { useState } from "react";
import { signupSchema } from "@/Utils/userValidation";
import { createUser } from "@/api/authApi";
import { Eye, EyeOff } from "lucide-react";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  general?: string;
}

const SignUp = () => {

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;

  // Clear error for this field if it exists
  if (errors[id as keyof typeof errors]) {
    setErrors(prev => ({
      ...prev,
      [id]: '', // clear only this field's error
    }));
  }

  // Update form state
  setForm(prev => ({
    ...prev,
    [id]: value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    console.log("form===>",form)
    const validation = signupSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormErrors;
        fieldErrors[field] = err.message;
      });
      console.log('error===>', fieldErrors)
      setErrors(fieldErrors);
      return;
    }

    // Call API
    setLoading(true);
    try {
      const response = await createUser(form);
      console.log("Signup success:", response);
      navigate('/signin');
      setForm({ fullName: "", email: "", password: "" });
    } catch (error: any) {
      console.error(error);
      setErrors({ general: error.response?.data?.message || "Failed to create user" });
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
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Create Account
              </CardTitle>
              <CardDescription className="text-base">
                Sign up to start booking your perfect experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground/90">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your name"
                  className="focus-visible:border-accent"
                  onChange={handleChange}
                />
                 {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/90">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="focus-visible:border-accent"
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/90">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                     placeholder="Create a password"
                  className="focus-visible:border-accent"
                  onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
              </div>
              <Button  onClick={handleSubmit} className="w-full mt-6" size="lg" style={{ background: 'var(--gradient-accent)' }}>
                {loading ? "Signing up..." : "Sign Up"}
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
