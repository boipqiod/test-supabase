import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import express from 'express';
const app = express();

app.use(express.json());

config({
    path: '.env'
})

const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_TOKEN ?? ''
);

app.get('/', async (req, res) => {
    const { data } = await supabase
        .from('user')
        .select();
    res.send(data);
})

app.post('/', async (req, res) => {
    const { name, email, password } = req.body as { name: string, email: string, password: string };

    const { data, error } = await supabase
        .from('user')
        .insert({
            name,
            email,
            password
        })
        .select();

    res.send(data);
});

app.patch('/', async (req, res) => {
    const { id, name, email, password } = req.body as { id: number, name: string, email: string, password: string };

    const { data } = await supabase
        .from('user')
        .update({
            name,
            email,
            password
        })
        .eq('id', id)

    res.send(data)
});

app.delete('/', async (req, res) => {
    const { id } = req.body as { id: number };

    const { data } = await supabase
        .from('user')
        .delete()
        .eq('id', id)

    res.send(data)
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
