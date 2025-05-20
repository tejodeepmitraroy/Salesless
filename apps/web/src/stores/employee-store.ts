import { create } from "zustand";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive";
  joinDate: string;
  phone?: string;
  address?: string;
  permissions: string[];
  lastActive?: string;
};

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  searchQuery: string;
  filterDepartment: string;
  filterRole: string;
  filterStatus: "all" | "Active" | "Inactive";
}

interface EmployeeActions {
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: number) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterDepartment: (department: string) => void;
  setFilterRole: (role: string) => void;
  setFilterStatus: (status: "all" | "Active" | "Inactive") => void;
  getFilteredEmployees: () => Employee[];
  updateEmployeeStatus: (employeeId: number, status: "Active" | "Inactive") => void;
  updateEmployeePermissions: (employeeId: number, permissions: string[]) => void;
}

type EmployeeStore = EmployeeState & EmployeeActions;

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  searchQuery: "",
  filterDepartment: "all",
  filterRole: "all",
  filterStatus: "all",
};

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  ...initialState,

  addEmployee: (employee: Employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),

  updateEmployee: (employee: Employee) =>
    set((state) => ({
      employees: state.employees.map((e) => (e.id === employee.id ? employee : e)),
    })),

  deleteEmployee: (employeeId: number) =>
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== employeeId),
    })),

  setSelectedEmployee: (employee: Employee | null) =>
    set(() => ({
      selectedEmployee: employee,
    })),

  setSearchQuery: (query: string) =>
    set(() => ({
      searchQuery: query,
    })),

  setFilterDepartment: (department: string) =>
    set(() => ({
      filterDepartment: department,
    })),

  setFilterRole: (role: string) =>
    set(() => ({
      filterRole: role,
    })),

  setFilterStatus: (status: "all" | "Active" | "Inactive") =>
    set(() => ({
      filterStatus: status,
    })),

  updateEmployeeStatus: (employeeId: number, status: "Active" | "Inactive") =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === employeeId ? { ...e, status } : e
      ),
    })),

  updateEmployeePermissions: (employeeId: number, permissions: string[]) =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === employeeId ? { ...e, permissions } : e
      ),
    })),

  getFilteredEmployees: () => {
    const state = get();
    let filtered = state.employees;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(query) ||
          employee.lastName.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query) ||
          employee.role.toLowerCase().includes(query)
      );
    }

    // Apply department filter
    if (state.filterDepartment !== "all") {
      filtered = filtered.filter(
        (employee) => employee.department === state.filterDepartment
      );
    }

    // Apply role filter
    if (state.filterRole !== "all") {
      filtered = filtered.filter(
        (employee) => employee.role === state.filterRole
      );
    }

    // Apply status filter
    if (state.filterStatus !== "all") {
      filtered = filtered.filter(
        (employee) => employee.status === state.filterStatus
      );
    }

    return filtered;
  },
})); 