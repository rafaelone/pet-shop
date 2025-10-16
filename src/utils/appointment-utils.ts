import { Appointment as AppointmentPrisma } from '@/generated/prisma';
import type {
  Appointment,
  AppointmentPeriodDay,
  AppointmentPeriod,
} from '@/types/appointment';

export const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 13 && hour < 18) return 'afternoon';
  return 'evening';
};

export function groupAppointmentByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments.map(
    (appointment) => ({
      ...appointment,
      time: appointment.scheduleAt.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      service: appointment.description,
      period: getPeriod(appointment.scheduleAt.getHours()),
    })
  );

  const morningAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === 'morning'
  );
  const afternoonAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === 'afternoon'
  );
  const eveningAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
}
