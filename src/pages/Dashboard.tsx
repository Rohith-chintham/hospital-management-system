
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserRound, 
  CalendarDays, 
  CalendarCheck,
  Activity,
  BadgePercent
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { 
  getDashboardStats, 
  getAppointments, 
  getPatients, 
  getDoctors 
} from '@/lib/db/db-service';
import { DashboardStats, Appointment } from '@/lib/db/models';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
  });
  
  const [upcomingAppointments, setUpcomingAppointments] = useState<(Appointment & { patientName: string; doctorName: string })[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<(Appointment & { patientName: string; doctorName: string })[]>([]);

  useEffect(() => {
    // Load dashboard stats
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);
    
    // Load appointments with patient and doctor names
    const appointments = getAppointments();
    const patients = getPatients();
    const doctors = getDoctors();
    
    const today = new Date().toISOString().split('T')[0];
    
    // Process appointments to include patient and doctor names
    const processedAppointments = appointments.map(appointment => {
      const patient = patients.find(p => p.id === appointment.patientId);
      const doctor = doctors.find(d => d.id === appointment.doctorId);
      
      return {
        ...appointment,
        patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
        doctorName: doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor',
      };
    });
    
    // Filter upcoming appointments
    const upcoming = processedAppointments
      .filter(a => a.appointmentDate >= today && a.status === 'scheduled')
      .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
      .slice(0, 5);
    
    // Filter recent appointments
    const recent = processedAppointments
      .filter(a => a.status === 'completed')
      .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())
      .slice(0, 5);
    
    setUpcomingAppointments(upcoming);
    setRecentAppointments(recent);
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of hospital activity and key metrics
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Patients"
            value={stats.totalPatients}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Doctors"
            value={stats.totalDoctors}
            icon={<UserRound className="h-5 w-5" />}
          />
          <StatCard 
            title="Total Appointments"
            value={stats.totalAppointments}
            icon={<CalendarDays className="h-5 w-5" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard 
            title="Upcoming Appointments"
            value={stats.upcomingAppointments}
            icon={<CalendarCheck className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AppointmentList 
            title="Upcoming Appointments"
            appointments={upcomingAppointments}
          />
          
          <AppointmentList 
            title="Recent Appointments"
            appointments={recentAppointments}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Department Performance</CardTitle>
              <CardDescription>Patient distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <div className="flex flex-col items-center">
                  <Activity className="h-10 w-10 mb-2" />
                  <p>Department statistics will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <div className="flex flex-col items-center">
                  <BadgePercent className="h-10 w-10 mb-2" />
                  <p>Revenue data will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
