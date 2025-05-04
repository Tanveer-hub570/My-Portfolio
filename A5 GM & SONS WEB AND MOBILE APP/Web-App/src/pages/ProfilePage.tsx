
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { User, Phone } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            My Profile
          </h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Account Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium">{user.name || 'Not provided'}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Phone Number</span>
              <span className="font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" /> 
                {user.phone}
              </span>
            </div>
            {user.isAdmin && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <span className="text-amber-800 font-medium">Admin Account</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
            {user.isAdmin && (
              <Button onClick={() => navigate('/admin')}>Admin Dashboard</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
