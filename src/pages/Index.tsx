import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, type Message } from "@/components/ChatMessage";
import { QuickActions } from "@/components/QuickActions";
import { Send, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock responses for different campus queries
const getCampusResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('schedule') || lowerQuery.includes('class')) {
    return "Your classes today:\n\n• 9:00 AM - Computer Science 101 (Room A205)\n• 11:00 AM - Mathematics 201 (Room B150)\n• 2:00 PM - English Literature (Room C305)\n• 4:00 PM - Physics Lab (Lab Building 2)";
  }
  
  if (lowerQuery.includes('library')) {
    return "📚 Library Services:\n\n• Study rooms available (reserve online)\n• Computer lab on 2nd floor\n• Research assistance desk\n• Printing services\n• Hours: 7 AM - 11 PM (Mon-Thu), 7 AM - 9 PM (Fri-Sat), 9 AM - 11 PM (Sun)";
  }
  
  if (lowerQuery.includes('dining') || lowerQuery.includes('food')) {
    return "🍽️ Dining Information:\n\nMain Dining Hall:\n• Breakfast: 7:00 AM - 10:00 AM\n• Lunch: 11:30 AM - 2:30 PM\n• Dinner: 5:00 PM - 8:00 PM\n\nCafé Central:\n• Open: 7:00 AM - 10:00 PM\n• Coffee, snacks, and light meals\n\nFood trucks on campus quad 11 AM - 3 PM";
  }
  
  if (lowerQuery.includes('map') || lowerQuery.includes('location') || lowerQuery.includes('where')) {
    return "🗺️ Campus Navigation:\n\n• Library: Central Campus, Building A\n• Student Services: Administration Building\n• Dining Hall: Campus Center\n• Gym/Recreation: Athletic Complex\n• Parking: Lots A-E around campus perimeter\n\nUse our mobile app for interactive maps and directions!";
  }
  
  if (lowerQuery.includes('register') || lowerQuery.includes('registration')) {
    return "📝 Registration Information:\n\n• Registration opens: November 15th\n• Meet with your advisor first\n• Use the student portal to register\n• Add/drop deadline: First week of semester\n• Need help? Visit Student Services (Admin Bldg, Room 101)";
  }
  
  if (lowerQuery.includes('office hours') || lowerQuery.includes('hours')) {
    return "🕐 Office Hours:\n\nRegistrar: Mon-Fri 8 AM - 5 PM\nStudent Services: Mon-Fri 9 AM - 6 PM\nFinancial Aid: Mon-Fri 9 AM - 4 PM\nCounseling: Mon-Fri 8 AM - 5 PM (appointments recommended)\nIT Help Desk: Mon-Sun 24/7 (online), Mon-Fri 9 AM - 5 PM (in-person)";
  }
  
  if (lowerQuery.includes('event') || lowerQuery.includes('happening')) {
    return "🎉 This Week's Events:\n\n• Monday: Career Fair (Student Center, 10 AM - 4 PM)\n• Wednesday: Guest Lecture Series (Auditorium, 7 PM)\n• Friday: Movie Night (Quad, 8 PM)\n• Saturday: Football Game vs. State University (Stadium, 2 PM)\n• Sunday: Study Group Sessions (Library, 6 PM)";
  }
  
  if (lowerQuery.includes('tutor') || lowerQuery.includes('academic support')) {
    return "📖 Academic Support:\n\n• Tutoring Center (Library 3rd floor)\n• Free tutoring for math, science, writing\n• Hours: Mon-Thu 9 AM - 9 PM, Fri 9 AM - 5 PM\n• Peer tutoring available\n• Study groups organized weekly\n• Writing center for essay help\n\nSchedule appointments online or walk-in!";
  }
  
  return "I'd be happy to help you with campus information! I can assist with:\n\n• Class schedules and academic calendar\n• Campus facilities and locations\n• Dining services and hours\n• Library services and resources\n• Administrative procedures\n• Campus events and activities\n\nWhat specific information would you like to know?";
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your Campus AI Assistant. I can help you with class schedules, campus facilities, dining information, library services, and administrative procedures. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: getCampusResponse(text),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    toast({
      title: "Response received",
      description: "Campus AI has responded to your query",
    });
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="gradient-primary p-6 shadow-campus">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Campus AI Assistant</h1>
              <p className="opacity-90">Your 24/7 campus information companion</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Quick Actions */}
        <QuickActions onActionClick={handleQuickAction} />

        {/* Chat Interface */}
        <Card className="shadow-campus">
          <div className="p-6">
            <ScrollArea ref={scrollAreaRef} className="h-[500px] w-full pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <Card className="bg-card p-4">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about schedules, facilities, dining, library services..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
