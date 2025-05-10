
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/data-table';
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
import DoctorForm from '@/components/doctors/DoctorForm';
import { Doctor } from '@/lib/db/models';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '@/lib/db/db-service';

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    setDoctors(getDoctors());
  };

  const handleAddDoctor = (data: Omit<Doctor, 'id'>) => {
    setIsSubmitting(true);
    try {
      addDoctor(data);
      setIsAddOpen(false);
      loadDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDoctor = (data: Omit<Doctor, 'id'>) => {
    if (!selectedDoctor) return;
    
    setIsSubmitting(true);
    try {
      updateDoctor(selectedDoctor.id, data);
      setIsEditOpen(false);
      loadDoctors();
    } catch (error) {
      console.error('Error updating doctor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDoctor = () => {
    if (!selectedDoctor) return;
    
    try {
      deleteDoctor(selectedDoctor.id);
      setIsDeleteOpen(false);
      loadDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const columns: ColumnDef<Doctor>[] = [
    {
      accessorFn: (row) => `Dr. ${row.firstName} ${row.lastName}`,
      header: "Name",
      id: "name",
    },
    {
      accessorKey: "specialization",
      header: "Specialization",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const doctor = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedDoctor(doctor);
                setIsEditOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedDoctor(doctor);
                setIsDeleteOpen(true);
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
            <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
            <p className="text-muted-foreground">
              Manage doctor information and specializations
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={doctors}
          searchKey="name"
          searchPlaceholder="Search doctors..."
        />
      </div>

      {/* Add Doctor Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <DoctorForm onSubmit={handleAddDoctor} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>

      {/* Edit Doctor Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
          </DialogHeader>
          {selectedDoctor && (
            <DoctorForm 
              initialData={selectedDoctor} 
              onSubmit={handleUpdateDoctor}
              isSubmitting={isSubmitting} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Doctor Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the doctor
              record and may affect related appointments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDoctor} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Doctors;
