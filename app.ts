import express from 'express';
import supabase from './src/supabase';
const app = express();



app.get('/', async (req, res) =>{
    const {} = await supabase.from('').select()
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
