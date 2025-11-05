import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, LogIn, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/Context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();


  const guestLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const userLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/my-bookings", label: "My Bookings" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const navLinks = isAuthenticated ? userLinks : guestLinks;

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
            <Calendar className="h-7 w-7" />
            <span>BookEase</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || 
                              (link.to.includes('#') && location.pathname + location.hash === link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : link.label === "Book Now" 
                        ? "text-primary hover:text-primary/80" 
                        : "text-slate-700 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>


          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Info Display - Shows when logged in */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                  <Avatar className="h-8 w-8 border-2 border-primary/30">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{user.fullName || ""}</span>
                    <span className="text-xs text-muted-foreground">{user.email || ''}</span>
                  </div>
                </div>
                
          
                  <Button onClick={logout} size="lg" className="h-14 bg-primary hover:bg-primary/90">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                
              </>
            ) : (
              <Link to="/signin">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <LogIn className="h-8 w-8 mr-2" />
                    Sign In
                  </Button>
                </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-slate-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to || 
                                (link.to.includes('#') && location.pathname + location.hash === link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                        : link.label === "Book Now" 
                          ? "text-primary hover:bg-slate-100" 
                          : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t pt-3 mt-2 flex flex-col gap-2">
                {!isAuthenticated ? (
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" onClick={logout}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
