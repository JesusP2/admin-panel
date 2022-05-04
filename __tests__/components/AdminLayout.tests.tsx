import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
            expect(screen.getByText('Inicio'));
            expect(screen.getByText('Usuarios'));
            expect(screen.getByText('Tareas'));
            expect(screen.getByText('Proyectos'));
        });

        it('Counters should render', () => {
            render(<Sidebar showSidebar={false} showSidebarDelay={false} />);
            expect(screen.getByTestId('users-counter'));
            expect(screen.getByTestId('tasks-counter'));
            expect(screen.getByTestId('projects-counter'));
        });

        it('Should render search input', () => {
            render(<Sidebar showSidebar={false} showSidebarDelay={false} />);
            expect(screen.getByTestId('search-input'));
            expect(screen.getByPlaceholderText('Buscar'));
        });

        describe('sidebar tabs', () => {
            let screen;
            let user;
            let homeEl;
            let userEl;
            let taskEl;
            let projectEl;
            beforeAll(() => {
                user = userEvent.setup();
                screen = render(<AdminLayout children={<div>Content</div>} />);
                homeEl = screen.getByTestId('home-tab');
                userEl = screen.getByTestId('user-tab');
                taskEl = screen.getByTestId('task-tab');
                projectEl = screen.getByTestId('project-tab');
            });

            it('Home tab', () => {
                expect(homeEl.className.includes('text-gray-600'));
                user.click(homeEl);
                expect(homeEl.className.includes('text-gray-300'));
                expect(userEl.className.includes('text-gray-300'));
                expect(taskEl.className.includes('text-gray-300'));
                expect(projectEl.className.includes('text-gray-300'));
            });

            it('user tab', () => {
                expect(userEl.className.includes('text-gray-600'));
                user.click(userEl);
                expect(userEl.className.includes('text-gray-300'));
                expect(homeEl.className.includes('text-gray-300'));
                expect(taskEl.className.includes('text-gray-300'));
                expect(projectEl.className.includes('text-gray-300'));
            });

            it('task tab', () => {
                expect(taskEl.className.includes('text-gray-600'));
                user.click(taskEl);
                expect(taskEl.className.includes('text-gray-300'));
                expect(userEl.className.includes('text-gray-300'));
                expect(homeEl.className.includes('text-gray-300'));
                expect(projectEl.className.includes('text-gray-300'));
            });

            it('project tab', () => {
                expect(projectEl.className.includes('text-gray-600'));
                user.click(projectEl);
                expect(projectEl.className.includes('text-gray-300'));
                expect(userEl.className.includes('text-gray-300'));
                expect(taskEl.className.includes('text-gray-300'));
                expect(homeEl.className.includes('text-gray-300'));
            });
        });

        describe('sidebar hidden tabs', () => {
            let screen;
            let user;
            let homeEl;
            let userEl;
            let taskEl;
            let projectEl;
            beforeAll(() => {
                user = userEvent.setup();
                screen = render(<AdminLayout children={<div>Content</div>} />);
                homeEl = screen.getByTestId('home-tab-hidden');
                userEl = screen.getByTestId('user-tab-hidden');
                taskEl = screen.getByTestId('task-tab-hidden');
                projectEl = screen.getByTestId('project-tab-hidden');
            });

            it('Home tab', () => {
                expect(homeEl.className.includes('text-gray-600'));
                user.click(homeEl);
                expect(homeEl.className.includes('text-gray-300'));
                expect(userEl.className.includes('text-gray-300'));
                expect(taskEl.className.includes('text-gray-300'));
                expect(projectEl.className.includes('text-gray-300'));
            });

            it('user tab', () => {
                expect(userEl.className.includes('text-gray-600'));
                user.click(userEl);
                expect(userEl.className.includes('text-gray-300'));
                expect(homeEl.className.includes('text-gray-300'));
                expect(taskEl.className.includes('text-gray-300'));
                expect(projectEl.className.includes('text-gray-300'));
            });

            it('task tab', () => {
                expect(taskEl.className.includes('text-gray-600'));
                user.click(taskEl);
                expect(taskEl.className.includes('text-gray-300'));
                expect(userEl.className.includes('text-gray-300'));
                expect(homeEl.className.includes('text-gray-300'));
                expect(projectEl.className.includes('text-gray-300'));
            });

            it('project tab', () => {
                expect(projectEl.className.includes('text-gray-600'));
                user.click(projectEl);
                expect(projectEl.className.includes('text-gray-300'));
                expect(userEl.className.includes('text-gray-300'));
                expect(taskEl.className.includes('text-gray-300'));
                expect(homeEl.className.includes('text-gray-300'));
            });
        });
    });
});
