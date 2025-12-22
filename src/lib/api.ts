import { Animal, Booking, TicketType } from './data';

const API_BASE_URL = 'http://localhost:3002/api';

// Animals API
export const fetchAnimals = async (): Promise<Animal[]> => {
    const response = await fetch(`${API_BASE_URL}/animals`);
    if (!response.ok) throw new Error('Failed to fetch animals');
    return response.json();
};

export const createAnimal = async (animal: Omit<Animal, 'id'>): Promise<Animal> => {
    const response = await fetch(`${API_BASE_URL}/animals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
    });
    if (!response.ok) throw new Error('Failed to create animal');
    return response.json();
};

export const updateAnimal = async (id: string, animal: Partial<Animal>): Promise<Animal> => {
    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
    });
    if (!response.ok) throw new Error('Failed to update animal');
    return response.json();
};

export const deleteAnimal = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/animals/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete animal');
};

// Bookings API
export const fetchBookings = async (): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
};

export const updateBooking = async (id: string, booking: Partial<Booking>): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    });
    if (!response.ok) throw new Error('Failed to update booking');
    return response.json();
};

export const deleteBooking = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete booking');
};

// Tickets API
export const fetchTickets = async (): Promise<TicketType[]> => {
    const response = await fetch(`${API_BASE_URL}/tickets`);
    if (!response.ok) throw new Error('Failed to fetch tickets');
    return response.json();
};

export const createTicket = async (ticket: TicketType): Promise<TicketType> => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
    });
    if (!response.ok) throw new Error('Failed to create ticket');
    return response.json();
};

export const updateTicket = async (id: string, ticket: Partial<TicketType>): Promise<TicketType> => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket),
    });
    if (!response.ok) throw new Error('Failed to update ticket');
    return response.json();
};

export const deleteTicket = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete ticket');
};

// Auth API
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

export const loginUser = async (email: string, password: string): Promise<AuthUser> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to login');
    }
    const data = await response.json();
    return data.user;
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthUser> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to register');
    }
    const data = await response.json();
    return data.user;
};
