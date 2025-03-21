import { useRef,useState} from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';
import { useSelector } from 'react-redux';
import axios from "axios"

export function DropzoneButton({ onUploadComplete }) {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  const [loading, setLoading] = useState(false); 
  const [status,setstatus] = useState(false);
  const id = useSelector((state)=> state.auth.user);

  const handleFileUpload = async (files) => {
    try {
      setLoading(true);
      const file = files[0];
      console.log("Uploading file:", file.name);
      console.log("User ID:", id);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", id);

      const response = await axios.post(
        "http://localhost:5000/v1/upload",
        formData,
        {
          withCredentials: true,
          // Let axios set the correct Content-Type with boundary
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      console.log("Upload response:", response.data);

      if(response.data.success) {
        alert("File Uploaded successfully");
        if (onUploadComplete) {
          onUploadComplete(file);
        }
      } else {
        alert(response.data.message || "Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Error uploading file: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone 
        openRef={openRef}
        onDrop={handleFileUpload}
        className={classes.dropzone}
        radius="md"
        maxSize={30 * 1024 ** 2}
        loading={loading}
        accept={[MIME_TYPES.pdf]}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
            are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button 
        className={classes.control} 
        size="md" 
        radius="xl" 
        onClick={() => openRef.current?.()} 
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Select files'}
      </Button>
    </div>
  );
}