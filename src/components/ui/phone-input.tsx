
import * as React from "react";
import { Check, Flag, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

// Central African countries with their phone codes
const centralAfricanCountries = [
  { name: "Cameroun", code: "CM", dialCode: "+237", format: "X XX XX XX XX" },
  { name: "République centrafricaine", code: "CF", dialCode: "+236", format: "XX XX XX XX" },
  { name: "Tchad", code: "TD", dialCode: "+235", format: "XX XX XX XX" },
  { name: "République du Congo", code: "CG", dialCode: "+242", format: "X XXX XXXX" },
  { name: "République démocratique du Congo", code: "CD", dialCode: "+243", format: "X XXX XXXX" },
  { name: "Guinée équatoriale", code: "GQ", dialCode: "+240", format: "XXX XXX XXX" },
  { name: "Gabon", code: "GA", dialCode: "+241", format: "X XX XX XX" },
  { name: "São Tomé-et-Príncipe", code: "ST", dialCode: "+239", format: "XXX XXXX" }
];

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange, className, ...props }: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(centralAfricanCountries[0]);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    if (value) {
      // Try to parse existing value to extract country code and number
      const country = centralAfricanCountries.find(c => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.replace(country.dialCode, ""));
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  const handleCountrySelect = (country: typeof centralAfricanCountries[0]) => {
    setSelectedCountry(country);
    setOpen(false);
    const newValue = country.dialCode + phoneNumber;
    onChange(newValue);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    const newValue = selectedCountry.dialCode + newPhoneNumber;
    onChange(newValue);
  };

  return (
    <div className="flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-10 w-[120px] justify-between font-medium mr-1"
          >
            <Flag className="h-4 w-4 mr-1.5 opacity-70" />
            {selectedCountry.dialCode}
            <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder="Rechercher un pays..." className="h-10" />
            <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
            <CommandGroup className="max-h-[240px] overflow-auto">
              {centralAfricanCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => handleCountrySelect(country)}
                  className="text-sm"
                >
                  {country.name} ({country.dialCode})
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCountry.code === country.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className={cn("h-10 flex-1", className)}
        placeholder={selectedCountry.format.replace(/X/g, "#")}
        {...props}
      />
    </div>
  );
}
