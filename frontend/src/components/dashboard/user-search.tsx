import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState, useRef } from "react";
import { Input } from "../ui/input";

interface UserSearchProps {
  onSelect: (userId: string) => void;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export function UserSearch({ onSelect }: UserSearchProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility
  const user = useAuthStore((state) => state.user);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  // Fetch users when the query changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (query.length > 2) {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/?search=${query}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          const data = await response.json();
          setUsers(data);
          setIsDropdownOpen(true); // Open dropdown when results are fetched
        } else {
          setUsers([]); // Clear results if the query is too short
          setIsDropdownOpen(false); // Close dropdown if query is too short
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [query, user?.token]);

  // Handle user selection
  const handleUserSelect = (user: User) => {
    setQuery(`${user.first_name} ${user.last_name} (${user.email})`); 
    onSelect(user.id); // Trigger onSelect callback
    setIsDropdownOpen(false); // Close dropdown
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <Input
        placeholder="Rechercher par email, prénom ou nom"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)} 
        className="rounded-none h-12"
      />
      {isDropdownOpen && users.length > 0 && (
        <div className="max-h-40 overflow-y-auto absolute w-full top-12 bg-white shadow-sm border border-gray-300 z-50">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {user.first_name} {user.last_name} ({user.email})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}