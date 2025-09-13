import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Utensils, 
  BookOpen, 
  FileText, 
  Clock,
  Users,
  GraduationCap
} from "lucide-react";

const quickActions = [
  {
    id: 'schedules',
    label: 'Class Schedules',
    icon: Calendar,
    query: "Show me my class schedule for today"
  },
  {
    id: 'facilities',
    label: 'Campus Map',
    icon: MapPin,
    query: "Where is the library located?"
  },
  {
    id: 'dining',
    label: 'Dining Hours',
    icon: Utensils,
    query: "What are the dining hall hours today?"
  },
  {
    id: 'library',
    label: 'Library Services',
    icon: BookOpen,
    query: "What library services are available?"
  },
  {
    id: 'admin',
    label: 'Registration',
    icon: FileText,
    query: "How do I register for classes?"
  },
  {
    id: 'hours',
    label: 'Office Hours',
    icon: Clock,
    query: "What are the registrar office hours?"
  },
  {
    id: 'events',
    label: 'Campus Events',
    icon: Users,
    query: "What events are happening this week?"
  },
  {
    id: 'academic',
    label: 'Academic Support',
    icon: GraduationCap,
    query: "Where can I get tutoring help?"
  }
];

interface QuickActionsProps {
  onActionClick: (query: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  return (
    <Card className="p-6 shadow-campus">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Quick Questions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex flex-col gap-2 hover:shadow-glow transition-all duration-200"
              onClick={() => onActionClick(action.query)}
            >
              <IconComponent className="h-5 w-5 text-primary" />
              <span className="text-xs text-center leading-tight">
                {action.label}
              </span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};