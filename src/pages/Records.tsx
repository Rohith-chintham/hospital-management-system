
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, FilePlus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DataTable } from '@/components/ui/data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/components/layout/MainLayout';
import { MedicalRecord } from '@/lib/db/models';
import { 
  getMedicalRecords,
  getPatientById,
  getDoctorById
} from '@/lib/db/db-service';

interface MedicalRecordWithNames extends MedicalRecord {
  patientName: string;
  doctorName: string;
}

const Records = () => {
  const [records, setRecords] = useState<MedicalRecordWithNames[]>([]);
  const [viewRecord, setViewRecord] = useState<MedicalRecordWithNames | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const allRecords = getMedicalRecords();
    const recordsWithNames = allRecords.map(record => {
      const patient = getPatientById(record.patientId);
      const doctor = getDoctorById(record.doctorId);
      
      return {
        ...record,
        patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
        doctorName: doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor',
      };
    });
    
    setRecords(recordsWithNames);
  };

  const columns: ColumnDef<MedicalRecordWithNames>[] = [
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "doctorName",
      header: "Doctor Name",
    },
    {
      accessorKey: "diagnosis",
      header: "Diagnosis",
    },
    {
      accessorKey: "recordDate",
      header: "Date",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const record = row.original;
        
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setViewRecord(record);
              setIsViewOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">
              View and manage patient medical records
            </p>
          </div>
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={records}
          searchKey="patientName"
          searchPlaceholder="Search records..."
        />
      </div>

      {/* View Record Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Medical Record</DialogTitle>
          </DialogHeader>
          {viewRecord && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Patient</h3>
                  <p>{viewRecord.patientName}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">Doctor</h3>
                  <p>{viewRecord.doctorName}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">Date</h3>
                  <p>{viewRecord.recordDate}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-sm font-medium">Diagnosis</h3>
                <p className="text-md">{viewRecord.diagnosis}</p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Prescription</h3>
                <Card>
                  <CardContent className="p-4">
                    <p>{viewRecord.prescription}</p>
                  </CardContent>
                </Card>
              </div>

              {viewRecord.notes && (
                <div>
                  <h3 className="mb-2 text-sm font-medium">Additional Notes</h3>
                  <p className="text-muted-foreground">{viewRecord.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Records;
