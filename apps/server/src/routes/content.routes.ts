import { Router } from 'express';
import { checkUploadStatus, deleteAObject, listAllObjects, uploadFileToS3, viewUrl } from '../controllers/upload.controllers';

const router = Router();

// Product routes

// Get presigned URL for upload
router.route('/upload-url').post(uploadFileToS3)

// Check upload status
router.get('/upload-status/:fileName', checkUploadStatus);

router.route('/view').get(viewUrl);

router.route('/').get(listAllObjects).delete(deleteAObject);

export default router;