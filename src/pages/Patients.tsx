
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate, useLocation } from 'react-router-dom';
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
import PatientForm from '@/components/patients/PatientForm';
import { Patient } from '@/lib/db/models';
import { getPatients, addPatient, updatePatient, deletePatient } from '@/lib/db/db-service';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    setPatients(getPatients());
  };

  const handleAddPatient = (data: Omit<Patient, 'id' | 'registrationDate'>) => {
    setIsSubmitting(true);
    try {
      addPatient(data);
      setIsAddOpen(false);
      loadPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePatient = (data: Omit<Patient, 'id' | 'registrationDate'>) => {
    if (!selectedPatient) return;
    
    setIsSubmitting(true);
    try {
      updatePatient(selectedPatient.id, {
        ...data,
        registrationDate: selectedPatient.registrationDate,
      });
      setIsEditOpen(false);
      loadPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePatient = () => {
    if (!selectedPatient) return;
    
    try {
      deletePatient(selectedPatient.id);
      setIsDeleteOpen(false);
      loadPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const columns: ColumnDef<Patient>[] = [
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      header: "Name",
      id: "name",
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "bloodGroup",
      header: "Blood Group",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const patient = row.original;
        
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedPatient(patient);
                setIsEditOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedPatient(patient);
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
            <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">
              Manage patient information and records
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={patients}
          searchKey="name"
          searchPlaceholder="Search patients..."
        />
      </div>

      {/* Add Patient Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <PatientForm onSubmit={handleAddPatient} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>

      {/* Edit Patient Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <PatientForm 
              initialData={selectedPatient} 
              onSubmit={handleUpdatePatient}
              isSubmitting={isSubmitting} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Patient Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the patient
              record and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePatient} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Patients;
