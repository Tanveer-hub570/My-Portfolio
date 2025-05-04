
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { usePartners, Partner } from '@/context/PartnerContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import PartnerForm from '@/components/admin/PartnerForm';

const AdminPartners = () => {
  const { partners, addPartner, updatePartner, deletePartner } = usePartners();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const handleAddPartner = (data: Omit<Partner, 'id'>) => {
    addPartner(data);
    setShowAddForm(false);
    toast({
      title: "Partner Added",
      description: "The partner has been successfully added.",
    });
  };

  const handleUpdatePartner = (data: Omit<Partner, 'id'>) => {
    if (editingPartner) {
      updatePartner({ ...data, id: editingPartner.id });
      setEditingPartner(null);
      toast({
        title: "Partner Updated",
        description: "The partner has been successfully updated.",
      });
    }
  };

  const handleDeletePartner = (id: string) => {
    deletePartner(id);
    toast({
      title: "Partner Deleted",
      description: "The partner has been successfully removed.",
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="h-8 w-8 mr-2" />
          <span>Partners Management</span>
        </h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => {
            setEditingPartner(null);
            setShowAddForm(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Add Partner</span>
        </Button>
      </div>

      {(showAddForm || editingPartner) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPartner ? 'Edit Partner' : 'Add New Partner'}</CardTitle>
            <CardDescription>
              {editingPartner 
                ? 'Update the partner information' 
                : 'Fill in the details to add a new partner'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PartnerForm 
              initialData={editingPartner || undefined} 
              onSubmit={editingPartner ? handleUpdatePartner : handleAddPartner} 
              onCancel={() => {
                setShowAddForm(false);
                setEditingPartner(null);
              }} 
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Partners List</CardTitle>
          <CardDescription>
            Manage all your business partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          {partners.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No partners added yet.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowAddForm(true)}
              >
                Add Your First Partner
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} logo`} 
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {partner.description.substring(0, 50)}
                        {partner.description.length > 50 ? '...' : ''}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{partner.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{partner.phone}</div>
                    </TableCell>
                    <TableCell>
                      {partner.active ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setEditingPartner(partner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the partner 
                                <strong> {partner.name}</strong>.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeletePartner(partner.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPartners;
