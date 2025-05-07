
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Save, ArrowRight, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const studentSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  date_naissance: z.string().min(1, "La date de naissance est requise"),
  lieu_naissance: z.string().optional(),
  sexe: z.string().min(1, "Le genre est requis"),
  nationalite: z.string().optional(),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  filiere: z.string().min(1, "Filière requise"),
  niveau: z.string().min(1, "Niveau requis"),
  photo: z.instanceof(FileList).optional().transform(val => val && val.length > 0 ? val : undefined),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const NewStudentPage: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      date_naissance: "",
      lieu_naissance: "",
      sexe: "",
      nationalite: "",
      email: "",
      telephone: "",
      adresse: "",
      filiere: "",
      niveau: "",
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    console.log("Form submitted:", data);
    
    // Simulation de la génération du matricule (serait normalement fait côté serveur)
    const prefix = data.filiere.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear().toString().substring(2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const matricule = `${prefix}${year}-${random}`;
    
    toast({
      title: "Inscription réussie",
      description: `L'étudiant ${data.prenom} ${data.nom} a été inscrit avec le matricule ${matricule}.`,
      duration: 5000,
    });
  };

  // Gestion de l'aperçu de la photo
  const handlePhotoChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header title="Nouvelle inscription" />
      <div className="flex-1 overflow-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-primary" />
              <CardTitle>Inscription d'un nouvel étudiant</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal" id="personal-tab">Informations personnelles</TabsTrigger>
                <TabsTrigger value="contact" id="contact-tab">Coordonnées</TabsTrigger>
                <TabsTrigger value="academic" id="academic-tab">Informations académiques</TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 flex justify-center mb-4">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Aperçu" className="object-cover w-full h-full" />
                          ) : (
                            <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
                              <UserPlus size={40} />
                            </div>
                          )}
                          <input 
                            type="file" 
                            id="photo" 
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => {
                              handlePhotoChange(e.target.files);
                              form.setValue('photo', e.target.files as unknown as FileList);
                            }}
                          />
                          <label 
                            htmlFor="photo"
                            className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
                          >
                            <Upload size={16} />
                          </label>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="prenom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Entrez le prénom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de famille</FormLabel>
                            <FormControl>
                              <Input placeholder="Entrez le nom de famille" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date_naissance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de naissance</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lieu_naissance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lieu de naissance</FormLabel>
                            <FormControl>
                              <Input placeholder="Lieu de naissance" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sexe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="M">Masculin</SelectItem>
                                <SelectItem value="F">Féminin</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nationalite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationalité</FormLabel>
                            <FormControl>
                              <Input placeholder="Nationalité" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={() => document.getElementById('contact-tab')?.click()}>
                        Suivant <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="exemple@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telephone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="+216 XX XXX XXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="adresse"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Adresse complète" className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={() => document.getElementById('academic-tab')?.click()}>
                        Suivant <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="filiere"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Filière</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une filière" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="informatique">Informatique</SelectItem>
                                <SelectItem value="gestion">Gestion</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="commerce">Commerce</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="communication">Communication</SelectItem>
                                <SelectItem value="rh">Ressources Humaines</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="niveau"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un niveau" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="l1">Licence 1</SelectItem>
                                <SelectItem value="l2">Licence 2</SelectItem>
                                <SelectItem value="l3">Licence 3</SelectItem>
                                <SelectItem value="m1">Master 1</SelectItem>
                                <SelectItem value="m2">Master 2</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="_matricule"
                        render={() => (
                          <FormItem>
                            <FormLabel>Matricule</FormLabel>
                            <FormControl>
                              <Input placeholder="Généré automatiquement" disabled />
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground">
                              Le matricule sera généré automatiquement lors de la validation
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button type="submit" className="gap-2">
                        <Save size={18} />
                        <span>Enregistrer l'inscription</span>
                      </Button>
                    </div>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewStudentPage;
