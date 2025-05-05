
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, Lock, User } from 'lucide-react';
import { OTPForm } from '@/components/auth/OTPForm';

const LoginPage = () => {
  // Login form state
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Register form state
  const [regPhone, setRegPhone] = useState('');
  const [name, setName] = useState('');
  
  // OTP verification state
  const [showOTP, setShowOTP] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For admin login, we'll check both email and password
      if (phone.includes('@')) {
        const success = await login(phone, password);
        if (success) {
          navigate('/admin');
        }
      } else {
        // For regular users with phone, proceed to OTP verification
        setShowOTP(true);
        setVerifyingPhone(phone);
        setIsNewUser(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!regPhone || !name) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      
      // Instead of direct registration, proceed to OTP verification
      setShowOTP(true);
      setVerifyingPhone(regPhone);
      setIsNewUser(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = async () => {
    try {
      if (isNewUser) {
        // Register the new user after OTP verification
        const success = await register(verifyingPhone, name);
        if (success) {
          navigate('/profile');
        }
      } else {
        // Login the existing user after OTP verification
        const success = await login(verifyingPhone);
        if (success) {
          navigate('/profile');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete authentication",
        variant: "destructive",
      });
    }
  };
  
  if (showOTP) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify Your Phone Number</CardTitle>
            <CardDescription>
              We've sent a verification code to {verifyingPhone}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OTPForm 
              phone={verifyingPhone} 
              onVerificationSuccess={handleVerificationSuccess} 
              onCancel={() => setShowOTP(false)}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 flex justify-center items-center fade-in">
      <div className="max-w-md w-full">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your phone number to login or enter your email and password for admin access.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      {phone.includes('@') ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                      Phone Number / Email
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Phone number or email"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  
                  {phone.includes('@') && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Register with your phone number to create a new account.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="reg-phone"
                      placeholder="e.g., +923001234567"
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
