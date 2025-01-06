import { Request, Response } from "express";
import PackageModel from "../models/package.model";

const createPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const packageData = req.body;
    const newPackage = new PackageModel(packageData);
    await newPackage.save();
    res.status(201).json({
      message: "Package created successfully.",
      package: newPackage,
    });
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Failed to create package.", error });
  }
};

const getAllPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const packages = await PackageModel.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error retrieving packages:", error);
    res.status(500).json({ message: "Failed to retrieve packages.", error });
  }
};

const getPackageById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const packageData = await PackageModel.findById(id);
    if (!packageData) {
      res.status(404).json({ message: "Package not found." });
      return;
    }
    res.status(200).json(packageData);
  } catch (error) {
    console.error(`Error retrieving package with ID ${id}:`, error);
    res.status(500).json({ message: "Failed to retrieve package.", error });
  }
};

const updatePackage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedPackage = await PackageModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedPackage) {
      res.status(404).json({ message: "Package not found." });
      return;
    }
    res.status(200).json({
      message: "Package updated successfully.",
      package: updatedPackage,
    });
  } catch (error) {
    console.error(`Error updating package with ID ${id}:`, error);
    res.status(500).json({ message: "Failed to update package.", error });
  }
};

const deletePackage = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedPackage = await PackageModel.findByIdAndDelete(id);
    if (!deletedPackage) {
      res.status(404).json({ message: "Package not found." });
      return;
    }
    res.status(200).json({ message: "Package deleted successfully." });
  } catch (error) {
    console.error(`Error deleting package with ID ${id}:`, error);
    res.status(500).json({ message: "Failed to delete package.", error });
  }
};

export default {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
