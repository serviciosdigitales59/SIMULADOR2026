const SUPABASE_URL = "https://voywguvexvpgstnluhfi.supabase.co";
const SUPABASE_KEY = "sb_publishable_ptOPObKSoDJKmN1Wn0MwtA_caHQErD0";

console.log("window.supabase:", window.supabase);

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Cliente:", supabaseClient);
