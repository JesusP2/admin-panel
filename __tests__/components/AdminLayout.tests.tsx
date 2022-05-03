import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminLayout from '../../src/components/AdminLayout';
import Sidebar from '../../src/components/SidebarLayout';

describe("Admin's layout", () => {
    it("should render admin's layout", () => {
        render(<AdminLayout children={<div>Content</div>} />);
        expect(screen.getByText('Content'));
        expect(screen.getByTestId('sidebar'));
        expect(screen.getByTestId('navbar'));
    });

    describe('Sidebar', () => {
        it('Should render tabs and icon', () => {
            render(<Sidebar showSidebar={false} showSidebarDelay={false} />);
            expect(screen.getByTestId('sidebar-icon'));
            expect(screen.getByText('Admin Panel'));
            expect(screen.getByText('Usuarios'));
            expect(screen.getByText('Tareas'));
            expect(screen.getByText('Proyectos'));
        });

        it("Counters should render", () => {
            render(<Sidebar showSidebar={false} showSidebarDelay={false} />);
            expect(screen.getByTestId('users-counter'));
            expect(screen.getByTestId('tasks-counter'));
            expect(screen.getByTestId('projects-counter'));
        })

        it("Should render search input", () => {
            render(<Sidebar showSidebar={false} showSidebarDelay={false} />);
            const input = screen.getByTestId("search-input")
            expect(input)
            expect(input.children.length).toBe(2)
            expect(screen.getByPlaceholderText("Buscar"))
        })
    });
});
