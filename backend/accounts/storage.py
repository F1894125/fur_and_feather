from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from cryptography.fernet import Fernet

class EncryptedFileSystemStorage(FileSystemStorage):
    def __init__(self, subfolder="", *args, **kwargs):
        # Dynamically append subfolder (e.g., 'ids', 'permits') to the secure root
        kwargs['location'] = settings.SECURE_DATA_ROOT / subfolder

        # Disable base URL functionality entirely for safety
        kwargs['base_url'] = None
        super().__init__(*args, **kwargs)
        
        # Initialize the encryption engine with the settings key
        self.fernet = Fernet(settings.FILE_ENCRYPTION_KEY.encode())

    def _save(self, name, content):
        """Encrypts the file before saving it to media/ directory."""
        # Read raw file bytes uploaded by the user
        file_bytes = content.read()
        
        # Encrypt the bytes
        encrypted_bytes = self.fernet.encrypt(file_bytes)
        
        # Wrap encrypted bytes into a file object and save to media/ directory
        encrypted_content = ContentFile(encrypted_bytes)
        return super()._save(name, encrypted_content)

    def open(self, name, mode='rb'):
        """Decrypts the file before serving it to the user."""
        # Fetch the scrambled file from media/ directory
        encrypted_file = super().open(name, mode)
        encrypted_bytes = encrypted_file.read()
        
        # Decrypt the bytes back to their clean original form
        decrypted_bytes = self.fernet.decrypt(encrypted_bytes)
        
        # Return it as an accessible stream for Django
        return ContentFile(decrypted_bytes, name=name)
