import express from 'express';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
const app = express();

config({
    path: '.env'
})

const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_TOKEN ?? ''
);


app.get('/', async (req, res) =>{
    const {data} = await supabase.from('user').select('name').eq('id', 1);
    console.log(data);
    res.send(data)
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
