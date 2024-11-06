import type { UseFetchOptions } from "#app";
import { FetchError } from "ofetch";

export default function useApi() {
	// enum Method {
	// 	GET = 'GET',
	// 	POST = 'POST',
	// 	DELETE = 'DELETE',
	// 	PATCH = 'PATCH'
	// }
	type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH';
	

	type Options = {
		keepalive: boolean;
		method?: Method;
		body?: {},
	}

	const fetchData: Ref<any> = ref();
	const isLoading: Ref<boolean> = ref(false);

	const callApi = async (url: string, opt?: Options) => {
		isLoading.value = true;
		try {
			const response = await $fetch(url, opt);
			fetchData.value = response;
		} catch (error) {
			const FetchError = error as FetchError;
			console.log(FetchError);
			
		} finally {
			isLoading.value = false;
		}
	}
	return { 
		fetchData,
		isLoading,
		callApi
	};
}