import { useMemo } from "react"
import { useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from "react-query"
import { formateQueryKeyDataAccessToReactQuery, QueryKeyAPIDataAccess } from "."

export interface MutationAPIDataAccessOptions<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown> {
    refetch?: Array<QueryKeyAPIDataAccess>
    mutationOptions?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>
} 

export function useMutationAPIDataAccess<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(apiCall: ((variables: TVariables) => Promise<TData>) | (() => Promise<TData>), options?: MutationAPIDataAccessOptions<TData, TError, TVariables, TContext> ): UseMutationResult<TData, TError, TVariables, TContext>{

    const queryClient = useQueryClient()

    const mutationOptions: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'> = useMemo(() => {
        const mutationOptionsFromProps = options?.mutationOptions
       

        const onError = mutationOptionsFromProps?.onError
            ? mutationOptionsFromProps.onError
            : () => console.error(`Problem to mutate`)

        const onSuccess = mutationOptionsFromProps?.onSuccess
            ? mutationOptionsFromProps.onSuccess
            : () => {
                if(options?.refetch && options.refetch.length){
                    options.refetch.forEach(({query, variables}) => {
                        queryClient.invalidateQueries(formateQueryKeyDataAccessToReactQuery({query, variables}))
                    })
                }
            }
           
        return {
            ...mutationOptionsFromProps,
            onError,
            onSuccess
        }    
    },[options, queryClient])

    return useMutation<TData, TError, TVariables, TContext>(apiCall,  mutationOptions)
} 