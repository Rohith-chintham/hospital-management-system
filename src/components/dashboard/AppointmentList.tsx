
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/lib/db/models';
import { cn } from '@/lib/utils';

interface AppointmentListProps {
  appointments: (Appointment & { patientName: string; doctorName: string })[];
  title: string;
  className?: string;
}

const AppointmentList = ({ appointments, title, className }: AppointmentListProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No appointments found</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <Badge
                        variant={
                          appointment.status === 'completed'
                            ? 'outline'
                            : appointment.status === 'cancelled'
                            ? 'destructive'
                            : 'default'
                        }
                        className="mr-2"
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium truncate">{appointment.purpose}</p>
                    <div className="mt-2 flex flex-col space-y-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="mr-1 h-3.5 w-3.5" />
                        <span className="truncate">{appointment.patientName}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        <span>{appointment.appointmentDate}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3.5 w-3.5" />
                        <span>{appointment.appointmentTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
