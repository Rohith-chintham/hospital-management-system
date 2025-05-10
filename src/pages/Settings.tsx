
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/components/layout/MainLayout';

const Settings = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your hospital system settings
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general hospital settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="hospitalName">
                    Hospital Name
                  </label>
                  <Input id="hospitalName" defaultValue="City General Hospital" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="hospitalAddress">
                    Address
                  </label>
                  <Input id="hospitalAddress" defaultValue="123 Medical Center Blvd" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contactPhone">
                    Contact Phone
                  </label>
                  <Input id="contactPhone" defaultValue="555-123-4567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contactEmail">
                    Contact Email
                  </label>
                  <Input id="contactEmail" defaultValue="info@cityhospital.org" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="userName">
                    Name
                  </label>
                  <Input id="userName" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="userEmail">
                    Email
                  </label>
                  <Input id="userEmail" defaultValue="admin@cityhospital.org" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="newPassword">
                    New Password
                  </label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="confirmPassword">
                    Confirm New Password
                  </label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Update Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Database Settings</CardTitle>
                <CardDescription>
                  Configure your database connection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dbHost">
                    Database Host
                  </label>
                  <Input id="dbHost" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dbPort">
                    Port
                  </label>
                  <Input id="dbPort" defaultValue="3306" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dbName">
                    Database Name
                  </label>
                  <Input id="dbName" defaultValue="hospital_db" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dbUser">
                    Username
                  </label>
                  <Input id="dbUser" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dbPassword">
                    Password
                  </label>
                  <Input id="dbPassword" type="password" defaultValue="********" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>
                  Manage database backups and restoration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-md font-medium">Create Backup</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate a complete backup of your hospital database
                  </p>
                  <div className="mt-4">
                    <Button>Create New Backup</Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-md font-medium">Recent Backups</h3>
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <p className="text-sm text-center text-muted-foreground">
                      No recent backups found
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-md font-medium">Restore From Backup</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a backup file to restore your database
                  </p>
                  <div className="mt-4">
                    <Input type="file" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Restore Database</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
