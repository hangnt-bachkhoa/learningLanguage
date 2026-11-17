import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'farm',
    loadComponent: () => import('./features/farm/farm.component').then(m => m.FarmComponent)
  },
  {
    path: 'lessons',
    loadComponent: () => import('./features/lessons/lessons.component').then(m => m.LessonsComponent)
  },
  {
    path: 'vocabulary',
    redirectTo: 'lessons',
    pathMatch: 'full'
  },
  {
    path: 'vocab',
    loadComponent: () => import('./features/vocab/vocab.component').then(m => m.VocabComponent)
  },
  {
    path: 'grammar',
    loadComponent: () => import('./features/grammar/grammar-list.component').then(m => m.GrammarListComponent)
  },
  {
    path: 'grammar/:code',
    loadComponent: () => import('./features/grammar/grammar-detail.component').then(m => m.GrammarDetailComponent)
  },
  {
    path: 'grammar/:code/quiz',
    loadComponent: () => import('./features/grammar/grammar-quiz.component').then(m => m.GrammarQuizComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: 'review',
    loadComponent: () => import('./features/review/review.component').then(m => m.ReviewComponent)
  },
  {
    path: 'progress',
    redirectTo: 'review'
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./features/inventory/inventory.component').then(m => m.InventoryComponent)
  },
  {
    path: 'guide',
    loadComponent: () => import('./features/guide/guide.component').then(m => m.GuideComponent)
  },
  {
    path: 'help',
    redirectTo: 'guide'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
