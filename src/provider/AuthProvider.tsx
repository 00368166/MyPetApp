import React, { useEffect, useState, createContext, useContext } from 'react';

import { supabase } from '../initSupabase';
import { Session, User } from '@supabase/supabase-js';
type ContextProps = {
	user: null | boolean;
	session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
	// user null = loading
	const [user, setUser] = useState<null | boolean>(null);
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const session = supabase.auth.session();
		setSession(session);
		setUser(session ? true : false);
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				console.log(`Supabase auth event: ${event}`);
				setSession(session);
				setUser(session ? true : false);
			}
		);
		return () => {
			authListener!.unsubscribe();
		};
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

export const UserContext = createContext<{ user: User | null; session: Session | null }>({
	user: null,
	session: null,
  })
  
  export const UserContextProvider = (props: any) => {
	const [session, setSession] = useState<Session | null>(null)
	const [user, setUser] = useState<User | null>(null)
  
	useEffect(() => {
	  const session = supabase.auth.session()
	  setSession(session)
	  setUser(session?.user ?? null)
	  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
		console.log(`Supabase auth event: ${event}`)
		setSession(session)
		setUser(session?.user ?? null)
	  })
  
	  return () => {
		authListener!.unsubscribe()
	  }
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
  
	const value = {
	  session,
	  user,
	}
	return <UserContext.Provider value={value} {...props} />
  }
  
  export const useUser = () => {
	const context = useContext(UserContext)
	if (context === undefined) {
	  throw new Error(`useUser must be used within a UserContextProvider.`)
	}
	return context
  }
  