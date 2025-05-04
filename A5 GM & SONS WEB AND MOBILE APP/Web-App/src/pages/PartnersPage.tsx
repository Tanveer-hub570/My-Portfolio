
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/context/PartnerContext';
import { Mail, Phone, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PartnersPage = () => {
  const { partners } = usePartners();
  const activePartners = partners.filter(p => p.active);

  return (
    <div className="container mx-auto py-8 px-4 fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center mb-2">
          <Users className="h-8 w-8 mr-2" />
          Our Partners
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We work with trusted partners to bring you the freshest fruits and vegetables. 
          These partnerships ensure quality and sustainability in our supply chain.
        </p>
      </div>

      {activePartners.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">We'll be adding our partners soon. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePartners.map((partner) => (
            <Card key={partner.id} className="overflow-hidden">
              <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle>{partner.name}</CardTitle>
                <CardDescription>
                  <Badge>Official Partner</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{partner.description}</p>
                <div className="pt-2">
                  <p className="text-sm font-medium">Contact: {partner.contactPerson}</p>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-2" /> {partner.phone}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Mail className="h-3 w-3 mr-2" /> {partner.email}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-2" /> {partner.address}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 py-3">
                <span className="text-xs text-muted-foreground">Verified Partner</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnersPage;
