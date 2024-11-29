import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, FormControl, Input, InputLabel } from '@mui/material';

const EditPiano = ({ apiUrl, onDelete, onPianoAdded }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [piano, setPiano] = useState(null);
    const [status, setStatus] = useState({ message: null, type: null });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPiano = async () => {
            try {
                const response = await fetch(`${apiUrl}${id}`);
                if (!response.ok) throw new Error("Failed to fetch the piano");

                const data = await response.json();
                setPiano(data);
                setIsLoading(false);
            } catch (err) {
                setStatus({ message: err.message, type: "error" });
            }
        };
        fetchPiano();
    }, [apiUrl, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPiano((prev) => ({ ...prev, [name]: value }));
        // Clear status on input change
        setStatus({ message: null, type: null }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(piano),
            });
            if (!response.ok) throw new Error("Failed to submit the form");

            setStatus({ message: "Piano edited successfully!", type: "success" });
            
            // Redirect to the details page for the edited piano
            navigate(`/piano_details/${id}`);
        } catch (err) {
            setStatus({ message: err.message, type: "error" });
        }
    };

    const handleDelete = async () => {
        try {
            await onDelete(id);
            if (onPianoAdded) onPianoAdded();
            navigate("/index_inventory");
        } catch (err) {
            setStatus({ message: `Error deleting the piano: ${err.message}`, type: "error" });
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div style={formContainer}>
            <h3>Edit an existing piano</h3>
            {status.message && <p className={status.type}>{status.message}</p>}

            <form style={muiFormStyle} onSubmit={handleSubmit}>
                {["brand", "price", "size", "imageUrl"].map((field) => (
                    <FormControl key={field}>
                        <InputLabel htmlFor={`form-${field}`}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </InputLabel>
                        <Input
                            type={field === "price" || field === "size" ? "number" : "text"}
                            name={field}
                            value={piano[field] || ""}
                            onChange={handleChange}
                            id={`form-${field}`}
                        />
                    </FormControl>
                ))}
                <Button style={muiSubmitBtn} type="submit" variant="contained">
                    Edit Piano
                </Button>
            </form>

            <Button color="warning" onClick={handleDelete} variant="contained">
                Delete Piano
            </Button>
            
            <Link to="/index_inventory">Back to Piano Inventory</Link>
        </div>
    );
};

// Styling objects
const formContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};
const muiFormStyle = {
    display: "flex",
    flexDirection: "column",
    height: "360px",
    width: "60%",
    justifyContent: "space-between",
};
const muiSubmitBtn = {
    margin: "20px 0px",
};

export default EditPiano;
