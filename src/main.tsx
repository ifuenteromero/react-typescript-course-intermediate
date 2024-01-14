import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routing/routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Defaults
			retry: 3, //if a query fails, react-query will retry 3 more times
			cacheTime: 300_000, //300.000 ms = 300s = 5 min If a query has no observer, meaning no component is using that query, that query is considered inactive
			//the result of inactive query is remove from the cache after 5 min, this is called garbage collection
			staleTime: 0, //specifies how long the data is considered fresh. A value of 0, means the moment we get a piece of data is treated as old, so the next time we need
			// the same piece of data, react query will refetch fresh data from the backend. Si le pones 10s o 10_000ms significa que en 10s los datos serán considerados stale.
			// React query automatically refreshes stale data under three situations
			// 1-When the network is reconnected
			// 2-When a component is mounted
			// 3-When the window is refocused
			refetchOnWindowFocus: true,
			refetchOnReconnect: true, // if the client goes offline, and then comes back online, react-query will refetch our queries
			refetchOnMount: true, //Our queries should be fetched when a component mounts for the first time
			// IMPORTANT
			// If the data is stale(old), react-query will attempt to fetch new data from the backend, while at the same time
			// returning the stale data from the cache to the application. Whith this approach we can show the user the cache data inmediatly, while
			// also getting the latest data in the background. Once we have the updated data, react query updates the cache and notifies our components that new data is available.
			// Our component will then rerender with fresh data.
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
