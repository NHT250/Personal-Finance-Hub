import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Analysis } from './pages/Analysis';
import { Transactions } from './pages/Transactions';
import { Support } from './pages/Support';
import { Settings } from './pages/Settings';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { MOCK_GOALS, MOCK_TRANSACTIONS } from './constants';
import { Goal, Transaction } from './types';
import { NewTransactionModal } from './components/NewTransactionModal';
import { NewContributionModal } from './components/NewContributionModal';
import { NewGoalModal } from './components/NewGoalModal';

type AuthState = 'landing' | 'login' | 'signup' | 'authenticated';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isNewTxOpen, setIsNewTxOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [isContribOpen, setIsContribOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);

  if (authState === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setAuthState('signup')} 
        onLogin={() => setAuthState('login')}
      />
    );
  }

  if (authState === 'login') {
    return (
      <LoginPage 
        onLogin={() => setAuthState('authenticated')} 
        onNavigateToSignUp={() => setAuthState('signup')} 
      />
    );
  }

  if (authState === 'signup') {
    return (
      <SignUpPage 
        onSignUp={() => setAuthState('authenticated')} 
        onNavigateToLogin={() => setAuthState('login')} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard />;
      case 'goals':
        return (
          <Goals 
            goals={goals}
            onOpenNewGoal={() => setIsNewGoalOpen(true)}
            onOpenContribution={(goalId) => {
              setSelectedGoalId(goalId);
              setIsContribOpen(true);
            }}
          />
        );
      case 'transactions':
        return <Transactions 
          transactions={transactions}
          onNewTransaction={() => setIsNewTxOpen(true)}
        />;
      case 'analysis':
        return <Analysis />;
      case 'support':
        return <Support />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={() => setAuthState('login')}
        onNewTransaction={() => {
          setActiveTab('transactions');
          setIsNewTxOpen(true);
        }}
      />
      
      <div className="content-shell flex-1 ml-72">
        <TopBar onLogout={() => setAuthState('login')} onNavigateToSettings={() => setActiveTab('settings')} />
        <main className="responsive-main p-10 max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>

      <NewTransactionModal
        isOpen={isNewTxOpen}
        onClose={() => setIsNewTxOpen(false)}
        onSave={(tx) => {
          setTransactions((prev) => [tx, ...prev]);
          setIsNewTxOpen(false);
        }}
      />

      <NewContributionModal
        isOpen={isContribOpen}
        goals={goals}
        defaultGoalId={selectedGoalId || undefined}
        onClose={() => {
          setIsContribOpen(false);
          setSelectedGoalId(null);
        }}
        onSave={(goalId, amount) => {
          setGoals((prev) => prev.map((g) => g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g));
          setIsContribOpen(false);
          setSelectedGoalId(null);
        }}
      />

      <NewGoalModal
        isOpen={isNewGoalOpen}
        onClose={() => setIsNewGoalOpen(false)}
        onSave={({ title, targetAmount, category, deadline, icon }) => {
          const newGoal: Goal = {
            id: `${Date.now()}`,
            title,
            targetAmount,
            currentAmount: 0,
            deadline: deadline || new Date().toISOString().slice(0, 10),
            category: category || 'Khác',
            priority: 'medium',
            status: 'active',
            icon,
          };
          setGoals((prev) => [newGoal, ...prev]);
          setIsNewGoalOpen(false);
        }}
      />
    </div>
  );
}
