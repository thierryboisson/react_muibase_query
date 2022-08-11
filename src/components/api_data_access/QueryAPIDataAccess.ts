import { useMemo } from "react";
import { QueryKey,useQuery,UseQueryOptions, UseQueryResult } from "react-query";

export interface QueryKeyAPIDataAccess<TVariables = unknown, TQuery = string> {
    query: TQuery
    variables?: TVariables
}

export function formateQueryKeyDataAccessToReactQuery<TVariables> ({query, variables}: QueryKeyAPIDataAccess<TVariables>): Array<string|TVariables> {
    const queryKey: Array<string|TVariables> = [query]
    if(variables){
        queryKey.push(variables)
    }
    return queryKey
}

export interface QueryAPIDataAccessOptions<TQueryFnData = unknown, TError = unknown, TVariables = unknown, > {
    variables?: TVariables,
    queryOptions?: Omit<UseQueryOptions<TQueryFnData, TError, TQueryFnData, QueryKey>, "queryKey" | "queryFn">
} 

export function useQueryAPIDataAccess<TQueryFnData = unknown,TError = unknown, TVariables = unknown> (query: string, apiCall: (variables: TVariables | undefined) => Promise<TQueryFnData>, options?: QueryAPIDataAccessOptions<TQueryFnData, TError,  TVariables> ): UseQueryResult<TQueryFnData, TError> {
    
    const queryKey: QueryKey = useMemo(() => {
       return formateQueryKeyDataAccessToReactQuery<TVariables>({query, variables: options?.variables})
    },[query, options])
    
    const queryOptions: Omit<UseQueryOptions<TQueryFnData, TError, TQueryFnData, QueryKey>, "queryKey" | "queryFn"> | undefined = useMemo(() => {
        const queryOptionsFromProps = options?.queryOptions

        const onError = queryOptionsFromProps?.onError
            ? queryOptionsFromProps.onError
            : () => console.error(`Problem to fetch data with query: ${query}`)

        const onSuccess = queryOptionsFromProps?.onSuccess
            ? queryOptionsFromProps.onSuccess
            : () => console.log(`fetch with query ${query}`)
           
        return {
            ...queryOptionsFromProps,
            onError,
            onSuccess
        }    
    }  ,[options, query])
    
    return useQuery<TQueryFnData,TError>(queryKey, () => apiCall(options?.variables), queryOptions)
    
}