import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Todo App', () => {
  test('renders todo input', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('can add new todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByText(/add/i);
    
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);
    
    const todoElement = screen.getByText('New Todo');
    expect(todoElement).toBeInTheDocument();
  });

  test('can complete todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByText(/add/i);
    
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);
    
    const todoElement = screen.getByText('Test Todo');
    fireEvent.click(todoElement);
    
    expect(todoElement.parentElement).toHaveClass('completed');
  });

  test('can delete todo', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByText(/add/i);
    
    fireEvent.change(inputElement, { target: { value: 'Delete Me' } });
    fireEvent.click(addButton);
    
    const deleteButton = screen.getByText('×');
    fireEvent.click(deleteButton);
    
    const todoElement = screen.queryByText('Delete Me');
    
    expect(todoElement).not.toBeInTheDocument();
  });

  test('filters work correctly', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByText(/add/i);
    
    // Add and complete a todo
    fireEvent.change(inputElement, { target: { value: 'Completed Todo' } });
    fireEvent.click(addButton);
    const completedTodo = screen.getByText('Completed Todo');


    fireEvent.click(completedTodo);
    
    // Add an active todo
    fireEvent.change(inputElement, { target: { value: 'Active Todo' } });
    fireEvent.click(addButton);
    
    // Test active filter



    const activeFilter = screen.getByText(/active/i);
    fireEvent.click(activeFilter);
    expect(screen.getByText('Active Todo')).toBeInTheDocument();
    expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument();
    
    // Test completed filter
    const completedFilter = screen.getByText(/completed/i);
    fireEvent.click(completedFilter);
    expect(screen.queryByText('Active Todo')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Todo')).toBeInTheDocument();
  });
});
