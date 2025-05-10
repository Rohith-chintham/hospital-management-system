
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, CalendarDays, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MainLayout from '@/components/layout/MainLayout';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import { Appointment } from '@/lib/db/models';
import { 
  getAppointments, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment,
  getPatientById,
  getDoctorById
} from '@/lib/db/db-service';

interface AppointmentWithNames extends Appointment {
  patientName: string;
  doctorName: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentWithNames[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const allAppointments = getAppointments();
    const appointmentsWithNames = allAppointments.map(appointment => {
      const patient = getPatientById(appointment.patientId);
      const doctor = getDoctorById(appointment.doctorId);
      
      return {
        ...appointment,
        patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
        doctorName: doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor',
      };
    });
    
    setAppointments(appointmentsWithNames);
  };

  const handleAddAppointment = (data: Omit<Appointment, 'id'>) => {
    setIsSubmitting(true);
    try {
      addAppointment(data);
      setIsAddOpen(false);
      loadAppointments();
    } catch (error) {
      console.error('Error adding appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAppointment = (data: Omit<Appointment, 'id'>) => {
    if (!selectedAppointment) return;
    
    setIsSubmitting(true);
    try {
      updateAppointment(selectedAppointment.id, data);
      setIsEditOpen(false);
      loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAppointment = () => {
    if (!selectedAppointment) return;
    
    try {
      deleteAppointment(selectedAppointment.id);
      setIsDeleteOpen(false);
      loadAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-hospital-500">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const columns: ColumnDef<AppointmentWithNames>[] = [
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "doctorName",
      header: "Doctor Name",
    },
    {
      accessorKey: "appointmentDate",
      header: "Date",
    },
    {
      accessorKey: "appointmentTime",
      header: "Time",
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const appointment = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const originalAppointment = getAppointments().find(a => a.id === appointment.id);
                if (originalAppointment) {
                  setSelectedAppointment(originalAppointment);
                  setIsEditOpen(true);
                }
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const originalAppointment = getAppointments().find(a => a.id === appointment.id);
                if (originalAppointment) {
                  setSelectedAppointment(originalAppointment);
                  setIsDeleteOpen(true);
                }
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Schedule and manage patient appointments
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={appointments}
          searchKey="patientName"
          searchPlaceholder="Search appointments..."
        />
      </div>

      {/* Add Appointment Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
          </DialogHeader>
          <AppointmentForm onSubmit={handleAddAppointment} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <AppointmentForm 
              initialData={selectedAppointment} 
              onSubmit={handleUpdateAppointment}
              isSubmitting={isSubmitting} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Appointment Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this appointment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAppointment} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Appointments;
