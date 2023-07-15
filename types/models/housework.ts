import { PostgrestSingleResponse } from '@supabase/postgrest-js'
import Household from '~/models/Household'

export async function getHouseholds (): Promise<PostgrestSingleResponse<Household[]>> {
  const supabase = useSupabaseClient()
  return await supabase.from('households').select()
}
export async function updateHouseholds (updates: Household): Promise<PostgrestSingleResponse<Household[]>> {
  const supabase = useSupabaseClient()
  return await supabase.from('households').upsert<Household>(updates).returns<Household[]>()
}

export type HouseholdsResponse = Awaited<ReturnType<typeof getHouseholds>>

export async function getHousehold (householdId: string): Promise<PostgrestSingleResponse<Household>> {
  const supabase = useSupabaseClient()
  return await supabase.from('households').select().eq('id', householdId).single()
}

export type HouseholdResponse = Awaited<ReturnType<typeof getHousehold>>
